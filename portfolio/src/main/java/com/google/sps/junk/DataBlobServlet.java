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

import com.google.sps.data.Comment;
import com.google.sps.data.Blob;
import com.google.appengine.api.datastore.DatastoreService;
import com.google.appengine.api.datastore.DatastoreServiceFactory;
import com.google.appengine.api.datastore.Entity;
import com.google.appengine.api.datastore.PreparedQuery;
import com.google.appengine.api.datastore.Query;
import com.google.appengine.api.datastore.Query.SortDirection;
import java.io.IOException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import com.google.gson.Gson;
import java.net.URL;

@WebServlet("/data-blob")
public class DataBlobServlet extends HttpServlet {

  ArrayList<Blob> blobs = new ArrayList<Blob>();


  @Override
  public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
    Query query = new Query("Blob").addSort("timestamp", SortDirection.DESCENDING);

    DatastoreService datastore = DatastoreServiceFactory.getDatastoreService();
    PreparedQuery results = datastore.prepare(query);
    
    this.blobs = new ArrayList<Blob>();
    for (Entity entity : results.asIterable()) {
      long id = entity.getKey().getId();
      URL url = new URL((String)entity.getProperty("url"));
      long timestamp = (long) entity.getProperty("timestamp");

      Blob blob = new Blob(id, url, timestamp);
      blobs.add(blob);
    }
    response.setContentType("text/html;");
    response.getWriter().println(convertToJSON(blobs));
  }

    public static String convertToJSON(ArrayList<Blob> blobsArray){
    Gson gson = new Gson();
    String json = gson.toJson(blobsArray);
    return json;
  }
}


