// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract Newsletter {
    struct Post {
        uint id;
        address author;
        string content;
        uint timestamp;
    }

    Post[] public posts;
    mapping(address => bool) public subscribers;

    event NewPost(uint id, address indexed author, string content, uint timestamp);
    event NewSubscriber(address indexed user);

    function subscribe() public {
        require(!subscribers[msg.sender], "Already subscribed");
        subscribers[msg.sender] = true;
        emit NewSubscriber(msg.sender);
    }

    function publishNewsletter(string memory _content) public {
        require(subscribers[msg.sender], "Not subscribed");
        uint postId = posts.length;
        posts.push(Post(postId, msg.sender, _content, block.timestamp));
        emit NewPost(postId, msg.sender, _content, block.timestamp);
    }

    function getPosts() public view returns (Post[] memory) {
        return posts;
    }
}
