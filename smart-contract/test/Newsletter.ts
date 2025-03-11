import { expect } from "chai";
import { ethers } from "hardhat";

describe("Newsletter Contract", function () {
  async function deployNewsletterFixture() {
    const [owner, user1, user2] = await ethers.getSigners();
    const Newsletter = await ethers.getContractFactory("Newsletter");
    const newsletter = await Newsletter.deploy();

    return { newsletter, owner, user1, user2 };
  }

  it("Should allow a user to subscribe", async function () {
    const { newsletter, user1 } = await deployNewsletterFixture();
    await expect(newsletter.connect(user1).subscribe())
      .to.emit(newsletter, "NewSubscriber")
      .withArgs(user1.address);

    const isSubscribed = await newsletter.subscribers(user1.address);
    expect(isSubscribed).to.be.true;
  });

  it("Should prevent double subscription", async function () {
    const { newsletter, user1 } = await deployNewsletterFixture();
    await newsletter.connect(user1).subscribe();
    await expect(newsletter.connect(user1).subscribe()).to.be.revertedWith("Already subscribed");
  });

  it("Should allow a subscribed user to publish a newsletter", async function () {
    const { newsletter, user1 } = await deployNewsletterFixture();
    await newsletter.connect(user1).subscribe();
    
    const content = "This is my first newsletter!";
	const latestBlock = await ethers.provider.getBlock("latest");
    await expect(newsletter.connect(user1).publishNewsletter(content))
      .to.emit(newsletter, "NewPost")
      .withArgs(0, user1.address, content, await latestBlock?.timestamp + 1);

    const posts = await newsletter.getPosts();
    expect(posts.length).to.equal(1);
    expect(posts[0].content).to.equal(content);
  });

  it("Should prevent non-subscribed users from publishing", async function () {
    const { newsletter, user1 } = await deployNewsletterFixture();
    await expect(newsletter.connect(user1).publishNewsletter("Unauthorized post")).to.be.revertedWith("Not subscribed");
  });
});
