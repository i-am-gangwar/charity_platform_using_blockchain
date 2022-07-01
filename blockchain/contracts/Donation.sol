// SPDX-License-Identifier: MIT
pragma solidity 0.8.14;

contract Donation {
    mapping(address => uint256) public accounts;
    event DonationDetails(address to, address from, uint256 amount);

    function addCharity(address _address, uint256 amount) external {
        amount = amount * (10**18);
        accounts[_address] = amount;
    }

    function donate(address to) external payable {
        require(msg.value > 0, "Donation: Value not greater zero");
        require(
            accounts[to] <= msg.value,
            "Donation: Charity not added to Platform or amount is greater then required value"
        );

        payable(to).transfer(msg.value);
        accounts[to] -= msg.value;
        emit DonationDetails(to, msg.sender, msg.value);
        
    }
}
