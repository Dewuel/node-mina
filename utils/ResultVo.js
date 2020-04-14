class ResultVo{
  static success(data){
    return {
      code: 0,
      msg: 'success',
      data
    }
  }

  static successNull(){
    return {
      code: 0,
      msg: 'success'
    }
  }

  static fail(code, msg){
    return {
      code,
      msg
    }
  }
}

module.exports = ResultVo;