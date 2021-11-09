pragma solidity ^0.5.0;

interface IERC20Token {
  function transfer(address, uint256) external returns (bool);
  function approve(address, uint256) external returns (bool);
  function transferFrom(address, address, uint256) external returns (bool);
  function totalSupply() external view returns (uint256);
  function balanceOf(address) external view returns (uint256);
  function allowance(address, address) external view returns (uint256);

  event Transfer(address indexed from, address indexed to, uint256 value);
  event Approval(address indexed owner, address indexed spender, uint256 value);
}

contract MutateToken {
    address public owner;

    constructor() public{
        owner = msg.sender;
    }

    mapping(address => string) public tokenName;
    mapping(address => uint) public tokenBalance;
    mapping(address => bool) public tokenIsLoaded;

    // Convert USDT token(_fromtoken) -> INRT token(_totoken) and send it to the address
    function mutate(address _fromtoken, address _totoken, address _to, uint _amount, uint _atrate, bool _multiply) public {
        uint exchangevalue;
        if(_multiply == true){
            exchangevalue = _atrate * _amount;
        }else{
            exchangevalue = _amount / _atrate;
        }
        require(IERC20Token(_totoken).balanceOf(address(this)) >= exchangevalue);
        require(IERC20Token(_fromtoken).balanceOf(msg.sender) >= 0);
        IERC20Token(_fromtoken).approve(address(this), _amount);
        IERC20Token(_fromtoken).transferFrom(msg.sender, address(this), _amount);
        IERC20Token(_totoken).transfer(_to, exchangevalue);
    }

    function loadTokens(string memory _name, address _token, uint _amount) public {
        require(msg.sender == owner);
        IERC20Token(_token).approve(address(this), _amount);
        IERC20Token(_token).transferFrom(msg.sender, address(this), _amount);
        tokenName[_token] = _name;
        tokenBalance[_token] = _amount;
        tokenIsLoaded[_token] = true;
    }

    function unloadTokens(address _token) public {
        require(msg.sender == owner);
        IERC20Token(_token).transfer(owner, tokenBalance[_token]);
        tokenBalance[_token] = 0;
        tokenIsLoaded[_token] = false;
    }

}
