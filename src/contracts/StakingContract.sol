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

contract StakingContract {

    //======== Constants ========//
    IERC20Token public rewardToken;
    address private owner;
    uint public totalRewardsupply;

    //======== Staking Section ========//
    mapping(address => uint) public TotalStakingBalance;
    mapping(address => mapping(address => uint)) public balanceOf; // balanceOf[Token][client]
    address[] public Stakers;
    address[] public stakingTokens;
    uint public lastUpdatedTime = 0;
    mapping(address => uint) public lastContribution;
    mapping(address => uint) public lastRelease;
    mapping(address => bool) public hasStaked;
    uint public rewardRate = 100000000000000000000; // 100 tokens per second

    //========================= Vesting Section ==============================//
    mapping(address => uint) public lockedBalance;
    mapping(address => uint) public unlockedBalance;
    mapping(address => uint) public redeemedBalance;

    constructor(address _rewardToken) public{
        rewardToken = IERC20Token(_rewardToken);
        owner = msg.sender;
        totalRewardsupply = rewardToken.balanceOf(address(this));
    }

    //======== Staking Interaction Seciton ========//
    function StakeTokens(address _stakingToken, uint _amount) public{
        require(_amount > 0);
        require(IERC20Token(_stakingToken).balanceOf(msg.sender) >= _amount);
        IERC20Token(_stakingToken).approve(address(this), _amount);
        IERC20Token(_stakingToken).transferFrom(msg.sender, address(this), _amount);
        balanceOf[_stakingToken][msg.sender] += _amount;
        if(hasStaked[msg.sender] == false){
            Stakers.push(msg.sender);
            hasStaked[msg.sender] = true;
        }
        lastContribution[msg.sender] = block.timestamp;
    }

    function unStakeTokens(address _stakingToken) public{
        require(balanceOf[_stakingToken][msg.sender] > 0);
        uint amount = balanceOf[_stakingToken][msg.sender];
        balanceOf[_stakingToken][msg.sender] = 0;
        IERC20Token(_stakingToken).transfer(msg.sender, amount);
    }

    function releaseTokens() public{
        uint releaseLimit = 60;
        require(block.timestamp - lastRelease[msg.sender] > 259200);
        uint unlockedamount = lockedBalance[msg.sender]/releaseLimit;
        lockedBalance[msg.sender] -= unlockedamount;
        unlockedBalance[msg.sender] += unlockedamount;
        lastRelease[msg.sender] = block.timestamp;
    }

    function redeemTokens(uint _amount) public payable{
        require(unlockedBalance[msg.sender] >= _amount);
        unlockedBalance[msg.sender] -=  _amount;
        redeemedBalance[msg.sender] += _amount;
        rewardToken.transfer(msg.sender, _amount);
    }

    function Contribute() public {
        uint currentTime = block.timestamp;
        for(uint i=0; i < stakingTokens.length; i++){
            uint currentTotalbalance = TotalStakingBalance[stakingTokens[i]];
            if ( currentTotalbalance > 0){
                uint rewardAmount = rewardRate*(currentTime - lastUpdatedTime);
                uint rewardConstant = rewardAmount/currentTotalbalance;
                for(uint j=0; j< Stakers.length; j++){
                    address user = Stakers[j];
                    if(lastContribution[user] - currentTime < 86400)
                    {
                    uint reward = balanceOf[stakingTokens[i]][user]*rewardConstant;
                    lockedBalance[user] = lockedBalance[user] + reward;
                    }
                }
            }
        }
        lastContribution[msg.sender] = currentTime;
        lastUpdatedTime = currentTime;
    }

    //======== Owner Seciton ========//
    function unLoadTokens(address _token) public{
        require(msg.sender == owner);
        uint amount = TotalStakingBalance[_token];
        TotalStakingBalance[_token] = 0;
        IERC20Token(_token).transfer(owner, amount);
    }

}
