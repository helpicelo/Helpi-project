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

contract ExchangeContract {

    address private owner;
    mapping(address => uint) public reserveOf;

    constructor() public{
        owner = msg.sender;
    }

    // _buyToken - The token customer wants to buy
    // _sellToken - The token customer wants to sell
    function buyToken(address _buyToken, address _sellToken, uint _amount, uint _rate, bool _multiply) public{
        require(reserveOf[_buyToken] >= _amount);
        uint exchangevalue;
        if(_multiply == true){
            exchangevalue = (_rate * _amount)/100;
        }else{
            exchangevalue = (_amount * 100) / _rate;
        }
        require(IERC20Token(_sellToken).balanceOf(msg.sender) >= exchangevalue);
        IERC20Token(_sellToken).approve(address(this), exchangevalue);
        IERC20Token(_sellToken).transferFrom(msg.sender, address(this), exchangevalue);
        IERC20Token(_buyToken).transfer(msg.sender, _amount);
        reserveOf[_buyToken] -= _amount;
        reserveOf[_sellToken] += exchangevalue;
    }

    function sellToken(address _buyToken, address _sellToken, uint _amount, uint _rate, bool _multiply) public{
        uint exchangevalue;
        if(_multiply == true){
            exchangevalue = (_rate * _amount)/100;
        }else{
            exchangevalue = (_amount * 100) / _rate;
        }
        require(reserveOf[_buyToken] >= exchangevalue);
        require(IERC20Token(_sellToken).balanceOf(msg.sender) >= _amount);
        IERC20Token(_sellToken).approve(address(this), _amount);
        IERC20Token(_sellToken).transferFrom(msg.sender, address(this), _amount);
        IERC20Token(_buyToken).transfer(msg.sender, exchangevalue);
        reserveOf[_buyToken] -= exchangevalue;
        reserveOf[_sellToken] += _amount;
    }

    function updateReserve(address _token) public{
        require(msg.sender == owner);
        reserveOf[_token] = IERC20Token(_token).balanceOf(address(this));
    }

    function unloadTokens(address _token) public {
        require(msg.sender == owner);
        uint _balance = IERC20Token(_token).balanceOf(address(this));
        IERC20Token(_token).transfer(owner, _balance);
        reserveOf[_token] -= _balance;

    }
}
