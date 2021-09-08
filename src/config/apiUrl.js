let baseUrl = "http://192.168.119.140:7001/admin/"

let servicePath = {
    checkLogin:baseUrl + 'checkLogin' ,  //  检查用户名密码
    getTypeInfo:baseUrl + "getTypeInfo", // 查询文章类型
    addArticle:baseUrl + 'addArticle' ,  //  添加文章
    updateArticle:baseUrl + 'updateArticle' ,  //  修改文章
    getArticleList:baseUrl + 'getArticleList' ,  //  文章列表
    delArticle:baseUrl + 'delArticle/' ,  //  删除文章
    getArticleById:baseUrl + 'getArticleById/' ,  //  根据ID获得文章详情
}

export default servicePath
