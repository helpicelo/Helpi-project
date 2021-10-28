pragma solidity ^0.5.0;

contract HELPIToken {
    string  public name = "Helpi Token";
    string  public symbol = "HELPI";
    uint256 public totalSupply = 100000000000000000000000000; // 100 million tokens
    uint8   public decimals = 18;

    event Transfer(
        address indexed _from,
        address indexed _to,
        uint256 _value
    );

    event Approval(
        address indexed _owner,
        address indexed _spender,
        uint256 _value
    );

    mapping(address => uint256) public _balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;

    constructor() public {
        _balanceOf[msg.sender] = totalSupply;
    }

    function balanceOf(address _address) public returns (uint256) {
        return _balanceOf[_address];
    }

    function transfer(address _to, uint256 _value) public returns (bool success) {
        require(_balanceOf[msg.sender] >= _value);
        _balanceOf[msg.sender] -= _value;
        _balanceOf[_to] += _value;
        emit Transfer(msg.sender, _to, _value);
        return true;
    }

    function approve(address _spender, uint256 _value) public returns (bool success) {
        allowance[msg.sender][_spender] = _value;
        emit Approval(msg.sender, _spender, _value);
        return true;
    }

    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success) {
        require(_value <= _balanceOf[_from]);
        require(_value <= allowance[_from][msg.sender]);
        _balanceOf[_from] -= _value;
        _balanceOf[_to] += _value;
        allowance[_from][msg.sender] -= _value;
        emit Transfer(_from, _to, _value);
        return true;
    }
}
