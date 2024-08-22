async function main( ) {
    const [deployer] = await ethers.getSigners( );
    const ownerAddr = deployer.address;
  
    console.log(`Deploying contracts with the account: ${ownerAddr}`);
  
    const Token = await ethers.getContractFactory("MyToken");
    const MyToken = await Token.deploy(ownerAddr);
    await MyToken.waitForDeployment( );
    const tokenAddr = await MyToken.getAddress( );
  
    console.log(`NFT address: ${tokenAddr}\n`);

    console.log("Verifying Contract...");
    try {
        await hre.run("verify:verify", {
            address: tokenAddr,
            constructorArguments: [ownerAddr],
        });
        console.log(`Contract verified to ${hre.config.etherscan.customChains[0].urls.browserURL}/address/${tokenAddr}`);
    } catch (err) {
        console.error("Error veryfing Contract. Reason:", err);
    }

}
  
main( )
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
});