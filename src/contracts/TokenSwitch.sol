pragma solidity ^0.5.0;

import "./USDToken.sol";
import "./INRToken.sol";

contract TokenSwitch {
    //The state variables
    // here DappToken and DiaToken are variable types and othere is their name
    USDToken public usdt;
    INRToken public inrt;
    address public owner;
    uint public exchangerate = 75; // USDT = 75 INRT



    constructor(USDToken _usdt, INRToken _inrt) public{
        usdt = _usdt;
        inrt = _inrt;
        owner = msg.sender;
    }

    //exchange funciton
    // USDT to INRT
    function usdt_inrt(address _to, uint _amount) public {

        uint exchangevalue = exchangerate * _amount;
        require(inrt.balanceOf(address(this)) >= exchangevalue);
        require(usdt.balanceOf(msg.sender) >= 0);
        usdt.approve(address(this), _amount);
        usdt.transferFrom(msg.sender, address(this), _amount);
        inrt.transfer(_to, exchangevalue);
    }

    function inrt_usdt(address _to, uint _amount) public {

        uint exchangevalue = _amount / exchangerate ;
        require(usdt.balanceOf(address(this)) >= exchangevalue);
        require(inrt.balanceOf(msg.sender) >= _amount);
        inrt.approve(address(this), _amount);
        inrt.transferFrom(msg.sender, address(this), _amount);
        usdt.transfer(_to, exchangevalue);

    }

}
