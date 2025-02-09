// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract IdentityNFT is ERC721, Ownable {
    uint256 public nextTokenId;
    mapping(address => bool) public verifiedUsers;

    constructor() ERC721("IdentityNFT", "IDNFT") {}

    function mint(address to) external onlyOwner {
        require(!verifiedUsers[to], "User already verified");
        uint256 tokenId = nextTokenId;
        nextTokenId++;
        _mint(to, tokenId);
        verifiedUsers[to] = true;
    }

    function isVerified(address user) external view returns (bool) {
        return verifiedUsers[user];
    }
}
