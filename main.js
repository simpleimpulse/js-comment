class Comment {

  constructor ( body ) {

		this.body = body;
		this.user = current_user;
		this.timestamp = Date.now()
		this.replies = 0;
		this.upvotes = 0;
		this.downvotes = 0;

  }

}

// This would usually come from an API, but keeping it simple in this case.
var current_user = {
		name: 'Michael',
		is_author: true,
		avatar_url: './avatar.png'
	}

// Functions and sample objects to be used for creating, populating and formatting comments.
var commentModule = {

	// An array of all comments created on the page. (No data storage capabilities, reloading the page will refresh this)
	comments: [],

	// Display a human readable string of how long ago a comment was entered.
	time_ago: function(date) {

		var seconds = Math.floor((new Date() - date) / 1000);

		duration = Math.floor(seconds / 86400);
		if (duration > 1) {
		return duration + " days";
		}

		duration = Math.floor(seconds / 3600);
		if (duration > 1) {
		return duration + " hours";
		}

		duration = Math.floor(seconds / 60);
		if (duration > 1) {
		return duration + " minutes";
		}

		return Math.floor(seconds) + " seconds";
	},

	// Create a new comment instance and add it to the DOM
	create_comment: function(body){

		var commentSection = document.querySelector('.comments');
		var newComment = new Comment(body)
		commentModule.comments.push(newComment)
		commentModule.populate_comment(commentSection, newComment)

	},

	// Get the comment text from the input and create a new comment with it. Then reset the input.
	add_comment: function(){
		var commentText = document.querySelector('.comment-text');
		
		if (commentText.value.trim().length > 0){

			commentModule.create_comment(commentText.value)

		}

		commentText.value = ''
	},

	// Iterate through all existing comments and populate the DOM with each one.
	populate_comments: function(){

		var commentSection = document.querySelector('.comments');
		this.comments.forEach(function(comment, index){
			commentModule.populate_comment(commentSection, comment);
		});

	},

	// Populate the target element in the DOM with a single comment, using the comment template.
	populate_comment: function(target, comment){

		var template = document.querySelector('#comment-template')

		var commentContent = document.importNode(template.content, true);

		commentContent.querySelector('.user-name').innerText = comment.user.name;
		commentContent.querySelector('.user-avatar img').src = comment.user.avatar_url;
		commentContent.querySelector('.author').className += comment.user.is_author?'':' hidden';
		commentContent.querySelector('.comment-time').innerText = commentModule.time_ago(comment.timestamp) + ' ago';
		commentContent.querySelector('.comment-body').innerText = comment.body;
		commentContent.querySelector('.reply-count').innerText = comment.replies;
		commentContent.querySelector('.btn-upvote').innerText = comment.upvotes;
		commentContent.querySelector('.btn-downvote').innerText = comment.downvotes;

		target.appendChild(commentContent);

	}
}


// Sample comment for test purposes and to ensure page displays atleast one comment.
var sample_comment = new Comment('Sometimes I\'ll start a sentence, and I don\'t even know where it\'s going. I just hope I find it along the way. Like an improv conversation. An improversation.')
commentModule.comments.push(sample_comment);

// Initialize the page with sample comment and add event listeners to the text input and submit button
document.addEventListener("DOMContentLoaded", function(){

	// Ensure the page initializes with the sample comment
	commentModule.populate_comments();

	document.querySelector('.comment-submit').addEventListener('click', function(){
		commentModule.add_comment();
	});	
	document.querySelector('.comment-text').addEventListener('keypress', function(e){
		if (e.keyCode == 13 || e.which == 13){
			commentModule.add_comment();
		}
	});

});


