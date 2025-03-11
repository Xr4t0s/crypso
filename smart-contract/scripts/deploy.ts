import { ethers } from "hardhat";

async function main() {
  const Newsletter = await ethers.getContractFactory("Newsletter");
  const newsletter = await Newsletter.deploy();

  await newsletter.waitForDeployment();

  console.log(`Newsletter deployed to: ${await newsletter.getAddress()}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
