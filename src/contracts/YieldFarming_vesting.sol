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

import "./HELPIToken.sol";

contract YieldFarming {
    //The state variables
    // here DappToken and DiaToken are variable types and othere is their name
    HELPIToken public helpiToken;
    uint public helpibalance;
    address public owner;
    uint public apr = 500;

    //current apr% is 500 can be changed

    address internal cUsdTokenAddress = 0x874069Fa1Eb16D44d622F2e0Ca25eeA172369bC1;
    address internal celoTokenAddress = 0xF194afDf50B03e69Bd7D057c1Aa9e10c9954E4C9;


    address[] public celostakers;
    address[] public cusdstakers;

    // for celo mapping the amount of tokens staked by each user
    mapping(address => uint) public celostakingBalance;
    mapping(address => bool) public celohasStaked;
    mapping(address => bool) public celoisStaking;

    //for cusd
    mapping(address => uint) public cusdstakingBalance;
    mapping(address => bool) public cusdhasStaked;
    mapping(address => bool) public cusdisStaking;

    //Vesting
    mapping(address => uint) public vestedamount;
    mapping(address => uint) public vestedtime;
    mapping(address =>uint) public releasedamount;
    mapping(address =>bool) public hasreleased;

    constructor(HELPIToken _helpiToken) public{
        helpiToken = _helpiToken;
        helpibalance = helpiToken.balanceOf(address(this));
        owner = msg.sender;
    }

    function changeapr(uint _newapr) public{
        require(msg.sender == owner);
        apr = _newapr;
    }

    // Staking amount
    // _tokentype == 0 for celo and _tokentype == 1 for cUSD
    function stakeToken(uint _tokentype, uint _amount) public{
        require(_amount > 0);
        if(_tokentype == 0)
        {
            IERC20Token(celoTokenAddress).approve(address(this), _amount);
            IERC20Token(celoTokenAddress).transferFrom(msg.sender, address(this), _amount);

            //Update the staking balance
            celostakingBalance[msg.sender] = celostakingBalance[msg.sender] + _amount;

            //Check is users is in the staking list
            if(!celohasStaked[msg.sender]){
                celostakers.push(msg.sender);
            }

            celoisStaking[msg.sender] = true;
            celohasStaked[msg.sender] = true;
        }
        else
        {
            IERC20Token(cUsdTokenAddress).approve(address(this), _amount);
            IERC20Token(cUsdTokenAddress).transferFrom(msg.sender, address(this), _amount);

            //Update the staking balance
            cusdstakingBalance[msg.sender] = cusdstakingBalance[msg.sender] + _amount;

            //Check is users is in the staking list
            if(!cusdhasStaked[msg.sender]){
                cusdstakers.push(msg.sender);
            }

            cusdisStaking[msg.sender] = true;
            cusdhasStaked[msg.sender] = true;
        }
    }

    function unstakeTokens(uint _tokentype) public {
        if(_tokentype == 0)
        {
            uint celobalance = celostakingBalance[msg.sender];
            require(celohasStaked[msg.sender] == true);
            require(celoisStaking[msg.sender] == true);
            require(celobalance > 0);
            IERC20Token(celoTokenAddress).transfer(msg.sender, celobalance);
            celostakingBalance[msg.sender] = 0;
            celoisStaking[msg.sender] = false;
        }
        else
        {
            uint cusdbalance = cusdstakingBalance[msg.sender];
            require(cusdhasStaked[msg.sender] == true);
            require(cusdisStaking[msg.sender] == true);
            require(cusdbalance > 0);
            IERC20Token(cUsdTokenAddress).transfer(msg.sender, cusdbalance);
            cusdstakingBalance[msg.sender] = 0;
            cusdisStaking[msg.sender] = false;
        }

    }

    //release helpi token
    function releasetoken(uint _time) public{
        if(hasreleased[msg.sender] == false){
            hasreleased[msg.sender] = true;
        }
        else{
           require(_time - vestedtime[msg.sender] > 24, "Tokens released every 24 hours");
        }
        if(vestedamount[msg.sender] > 10){
            vestedamount[msg.sender] = vestedamount[msg.sender] - 10;
            releasedamount[msg.sender] = releasedamount[msg.sender] + 10;
        }
        else{
            releasedamount[msg.sender] = releasedamount[msg.sender] + vestedamount[msg.sender];
            vestedamount[msg.sender] = 0;
        }
        vestedtime[msg.sender] = _time;

    }

    //Redeem tokens
    function redeemtoken(uint _amount) public payable{
        require(releasedamount[msg.sender] >= _amount);
        helpiToken.transfer(msg.sender, _amount);

    }

    //Issue new tokens
    function issueTokens() public {
        require(msg.sender == owner); // only the owner who deployed this funciton can call this function
        for (uint i=0; i< celostakers.length; i++){
            address recipent = celostakers[i];
            uint interest = celostakingBalance[recipent]*(apr/100);
            require(celoisStaking[recipent] == true);
            if(interest > 0){
                vestedamount[recipent] = vestedamount[recipent] + interest;
              //helpiToken.transfer(recipent, interest);
              helpibalance -= interest;
            }

        }

        for (uint i=0; i< cusdstakers.length; i++){
            address recipent = cusdstakers[i];
            uint interest = cusdstakingBalance[recipent]*(apr/100);
            require(cusdisStaking[recipent] == true);
            if(interest > 0){
              vestedamount[recipent] = vestedamount[recipent] + interest;
              //helpiToken.transfer(recipent, interest);
              helpibalance -= interest;
            }

        }
    }
}
