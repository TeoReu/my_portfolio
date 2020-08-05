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

package com.google.sps;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Collection;

public final class FindMeetingQuery {
  public Collection<TimeRange> query(Collection<Event> events, MeetingRequest request) {
    System.out.println("TEST");
    List<TimeRange> list= new ArrayList<TimeRange>();
    list.add(TimeRange.WHOLE_DAY);
    if(request.getAttendees().size() == 0 && request.getOptionalAttendees().size()  == 0){
      return Arrays.asList(TimeRange.WHOLE_DAY);
    }

    if(request.getDuration() > TimeRange.WHOLE_DAY.duration()){
      return Arrays.asList();
    }

    if(events.size() == 0)
      return Arrays.asList(TimeRange.WHOLE_DAY);
    else{
      for(Event event : events){
        if(checkCommonAttendees(event,request.getAttendees())){      
          System.out.println(event.getWhen());
          list = sliceEventFromToTimeRange(event,list);
        }
      }
    }

    //Remove Timegaps like [a,b) where b-a < request.duration()
    list = removeSmallGaps(list,request);
    System.out.println(request.getAttendees());

    //Checking out optional atteendees schedule
    if(request.getOptionalAttendees().size() != 0){
      System.out.println("There are optional atteendees");
      List<TimeRange> gapsWithOptionalAttendees = new ArrayList<TimeRange>(list);
      System.out.println(gapsWithOptionalAttendees);
      
      for(Event event : events){
        if(checkCommonAttendees(event,request.getOptionalAttendees()))
          gapsWithOptionalAttendees = sliceEventFromToTimeRange(event,gapsWithOptionalAttendees);
      }

      gapsWithOptionalAttendees = removeSmallGaps(gapsWithOptionalAttendees,request);

      if(gapsWithOptionalAttendees.size() != 0)
        return gapsWithOptionalAttendees;
    }

    return list;  
    //throw new UnsupportedOperationException("TODO: Implement this method.");
  }

  public boolean checkCommonAttendees(Event event, Collection<String> attendees){
      for(String attendee : attendees){
          if(event.getAttendees().contains(attendee))
            return true;
      }
    return false;
  }

  public List<TimeRange> sliceEventFromToTimeRange(Event event, List<TimeRange> list){
      List<TimeRange> newlist= new ArrayList<TimeRange>();
      TimeRange ev = event.getWhen();
      for(TimeRange tr : list){
        if(tr.overlaps(ev)){
          if(tr.start() >= ev.start() && ev.end() <= tr.end()){
            if(TimeRange.fromStartEnd(ev.end(), tr.end(), false).duration() != 0)
                newlist.add(TimeRange.fromStartEnd(ev.end(), tr.end(), false));
          }else if(tr.start() <= ev.start() && ev.end() <= tr.end()){
            if(TimeRange.fromStartEnd(tr.start(), ev.start(), false).duration() != 0)
              newlist.add(TimeRange.fromStartEnd(tr.start(), ev.start(), false));
            if(TimeRange.fromStartEnd(ev.end(), tr.end(), false).duration() != 0)  
              newlist.add(TimeRange.fromStartEnd(ev.end(), tr.end(), false));
          }else if(tr.start() <= ev.start() && ev.end() >= tr.end()){
            if(TimeRange.fromStartEnd(tr.start(), ev.start(), false).duration() != 0)   
                newlist.add(TimeRange.fromStartEnd(tr.start(), ev.start(), false));
          }
        }else{
          newlist.add(tr);
        }
      }
    return newlist;  
  }

  public List<TimeRange> removeSmallGaps(List<TimeRange> list, MeetingRequest request){
    List<TimeRange> listCopy = new ArrayList<TimeRange>(list);
    for(TimeRange tr : listCopy){
      if(tr.duration() < request.getDuration()){
        list.remove(tr);
      }
    }
    return list;
  } 
}
