$(document).ready(function(){
    const removedNotes = [];

    // Add Note
    $("#addNote").click(function(){
      let noteText = prompt("Enter note text:");
      if (noteText) {
        $("<div class='note'>" + noteText + "<br><button class='editNote'>Edit</button></div>").appendTo("#board").hide().fadeIn("slow");
      }
    });

    // Temporarily Remove Note
    $(document).on("contextmenu", ".note", function(e){
      e.preventDefault();
      let $note = $(this);
      $note.fadeOut("fast", function(){
        let $removedNote = $note.clone().appendTo("#removedPanel").fadeIn("fast").addClass("removed");
        $removedNote.append("<button class='restoreNote'>Restore</button>");

        removedNotes.push($removedNote);
        resetBoardLayout();
      });
    });

    // Restore Note
    $(document).on("click", ".restoreNote", function(){
        let $note = $(this).parent();
        $note.fadeOut("fast", function(){
          $note.removeClass("removed");
          $note.appendTo("#board").fadeIn("fast");
          $(this).find(".restoreNote").remove();
          removedNotes.splice(removedNotes.indexOf($note), 1);
          resetBoardLayout();
        });
    });

    // Edit Note
    $(document).on("click", ".editNote", function(e){
      e.stopPropagation();
      let $note = $(this).parent();
      let newText = prompt("Enter new note text:", $note.text().trim());
      if (newText !== null) {
        $note.contents().filter(function() {
          return this.nodeType === 3; 
        }).first().replaceWith(newText); 
      }
    });

    // Mark Note as Important
    $(document).on("click", ".note", function(e){
      if (!$(this).hasClass("important")) {
        $(this).addClass("important");
      } else {
        $(this).removeClass("important");
      }
    });

    // Remove Notes Button
    $("#removeNotes").click(function(){
        $("#board .note").each(function(){
          let $note = $(this);
          let $removedNote = $note.clone().appendTo("#removedPanel").fadeIn("fast").addClass("removed");
          $removedNote.append("<button class='restoreNote'>Restore</button>"); 
          removedNotes.push($removedNote);
        });
        $("#board").empty();
        resetBoardLayout();
    });

    // Reset Board Layout
    function resetBoardLayout() {
        $("#removedPanel").empty();
        for (let i = 0; i < removedNotes.length; i++) {
            removedNotes[i].appendTo("#removedPanel").fadeIn("fast");
        }
    }
});
