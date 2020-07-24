var currentComments =[];

function t(oc, nc) {
  console.log(comment2timestamp(oc) + " -> " + comment2timestamp(nc));
  currentComments = oc;
  refreshComments(nc);
  console.log("----");
}

function removeCommentElement(i) {
  console.log("deleting comment with timestamp " + i);
}

function timestamp2comment(ts) {
  return ts.map(x => ({timestamp:x}));
}

function comment2timestamp(ts) {
  return ts.map(x => x.timestamp);
}


function refreshComments(comments){
  var i = comments.length - 1;
  var j = currentComments.length - 1;
  if((i==-1 && j> -1) || (currentComments[0].timestamp < comments[i].timestamp)){
    while(j>-1){
      removeCommentElement(currentComments[j].timestamp);
      currentComments.splice(j,1);
      j--;
    }
  }else{
    while(currentComments[0].timestamp >= comments[i].timestamp){
      if(currentComments[j].timestamp!=comments[i].timestamp){
        removeCommentElement(currentComments[j].timestamp);
        currentComments.splice(j,1);
        if(j>0)
            j--;
      }
      else{
        if(j>0 && i >0){
            j--;
            i--;
        }else if(j>0){
            j--;
        }else if(i>0){
            i--;
        }else{
            break;
        }
      }
    }
  }
  currentCommentsTS = 0;
  if(j>-1)
    currentCommentsTS = currentComments[0].timestamp;
  while(i>-1 && currentCommentsTS<comments[i].timestamp){
    console.log("creating new comment with timestamp " + comments[i].timestamp + " at the beginning");
    //newComment = createCommentElement(comments[i]);
    //const commentsListElement = document.getElementById('comments-list');
    //commentsListElement.insertBefore(newComment,commentsListElement.firstChild);
    i--;
  }
  //newComment = createCommentElement(comments[j]);
  // const commentsListElement = document.getElementById('comments-list');
  //commentsListElement.insertBefore(newComment,commentsListElement.firstChild);
  //removeCommentElement(i);
  //currentComments.splice(i,1);
  currentComments = comments;
}
