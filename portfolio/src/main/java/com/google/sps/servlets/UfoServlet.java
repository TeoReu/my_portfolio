// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

package com.google.sps.servlets;

import com.google.gson.Gson;
import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Scanner;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

@WebServlet("/ufos-data")
public class UfoServlet extends HttpServlet {
  
  //Using a likedhashmap beacause I assume data in the cvs is ordered.
  private LinkedHashMap<String, Integer> ufosSightings = new LinkedHashMap<>();

  @Override
  public void init(){
    Scanner scanner = new Scanner(getServletContext().getResourceAsStream(
        "/WEB-INF/ufos.csv"));
    String currentYear = "1969";    
    Integer sightings = 0;
    while (scanner.hasNextLine()) {
      String line = scanner.nextLine();
      //String[] cells = line.split("-");
      try{
        String cell = formatData(line);
      if(cell.equals(currentYear))
        sightings += 1;
      else{
        ufosSightings.put(currentYear, sightings);
        currentYear = cell;
        sightings = 1;
      }
      } catch ( ParseException e){
          e.printStackTrace();
      }
    }

    scanner.close();
  }


  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    response.setContentType("application/json");
    Gson gson = new Gson();
    String json = gson.toJson(ufosSightings);
    response.getWriter().println(json);
  }

  public String formatData(String line) throws ParseException{
    SimpleDateFormat formatter = new SimpleDateFormat("yyyy");
      Date dateStr = formatter.parse(line);
      String cell = formatter.format(dateStr);
      return cell;
  }
}
