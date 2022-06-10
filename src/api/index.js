import axios from 'axios'
import mpAdapter from 'axios-miniprogram-adapter'

axios.defaults.adapter = mpAdapter


const instance = axios.create({
    baseURL: 'http://localhost:3000',
    // timeout: 1000
});

// 使用cookie来对session的支持
//请求拦截
instance.interceptors.request.use(function (config) {
    const cookie = wx.getStorageSync('cookie')
    config.headers['cookie'] = cookie
    return config
})

//响应拦截
instance.interceptors.response.use(function (response) {
    if (response.headers['Set-Cookie']) {
        wx.setStorageSync('cookie', response.headers['Set-Cookie'])
    }
    if (response.status != 200) {
        wx.showToast({
            title: '网络错误，请稍后重试',
            icon: 'error',
            duration: 2000
        })
        return
    }
    // 如果收到该响应，返回到登录页面
    if (response.data.code == '401000') {
        // uni.reLaunch({
        //     url: '/pages/login',
        //     success: function () {
        //         wx.showToast({
        //             title: '账号已下线，请重新登录',
        //         })
        //     }
        // })
        wx.showToast({
            title: '账号已下线，请重新登录',
        })
    }
    return response.data;
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});

/**
 * 管理员登录接口
 * @param {*} data 
 */
export const reqLogin = async (data) => {
    let res = await instance.post("users/login", data)
    return res
}

/**
 * 获取菜单项
 */
export const reqMenus = async () => await instance.get("menu/all")

/**
 * 管理员登出接口
 * @param {*} data 
 */
export const reqLogout = async (data) => await instance.get("users/login")

/**
 * 管理员修改自身基本信息
 * @param {*} data 
 */
export const reqUpdateSelfAdmin = async (data) => await instance.put("users/inf", data)

/**
 * 修改密码
 * @param {*} data 
 */
export const reqUpdateSelfPwd = async (data) => await instance.put("users/pwd", data)

/**
 * 获取所有管理员数据
 */
export const reqAllAdmin = async () => await instance.get("users/allAdmin")
// 获取一个根据id
export const reqOneAdmin = async (data) => await instance.get('/users/one', { params: data })

/**
 * 修改其他管理员的信息
 */
export const reqUpdateAdmin = async (data) => await instance.put("users/updateOne", data)

/**
 * 删除其他管理员的信息
 */
export const reqDeleteAdmin = async (data) => await instance.put("users/deleteOne", data)

/**
 * 添加管理员的权限
 */
export const reqAddAdminRole = async (data) => await instance.put("users/addRole", data)

/**
 * 删除管理员的权限
 */
export const reqDelAdminRole = async (data) => await instance.post("users/delRole", data)

/**
 * 添加一名管理员
 * @param {*} data 
 */
export const reqAddOneAdmin = async (data) => await instance.put('users/addOne', data)

/**
 * 获取所有权限信息
 */
export const reqAllRoles = async () => await instance.get('/users/roles')

/**
 * 志愿者文章
 */
// 获取所有志愿者文章
export const reqAllVolunteerArticle = async () => await instance.get('/volunteerArticle')
// one
export const reqVolunteerArticle = async (data) => await instance.get('/volunteerArticle/one', { params: data })
// 审核
export const reqUpdateVolunterArticle = async (data) => await instance.post('./volunteerArticle/update', data)

/**
 * 寻亲者文章
 */
// 获取所有文章
export const reqAllSeekerArticle = async () => await instance.get('/seekerArticle')
// one
export const reqSeekerArticle = async (data) => await instance.get('/seekerArticle/one', { params: data })
// 审核
export const reqUpdateSeekerArticle = async (data) => await instance.post('./seekerArticle/update', data)



/**
 * 志愿者
 */
// 获取所有志愿者
export const reqAllVolunteer = async () => await instance.get('/volunteer')
// 获取一个根据id
export const reqOneVolunteer = async (data) => await instance.get('/volunteer/one', { params: data })

//添加一名
export const reqAddOneVolunteer = async (data) => await instance.put('/volunteer/addOne', data)

//del
export const reqDelVolunteer = async (data) => await instance.post('/volunteer/delOne', data)

//update
export const reqUpdOneVolunteer = async (data) => await instance.put('/volunteer/updOne', data)

/**
 * 寻亲者
 */
// 获取所有寻亲者
export const reqAllSeeker = async () => await instance.get('/seeker')
// 获取一个根据id
export const reqOneSeeker = async (data) => await instance.get('/seeker/one', { params: data })

//添加一名
export const reqAddOneSeeker = async (data) => await instance.put('/seeker/addOne', data)

//del
export const reqDelSeeker = async (data) => await instance.post('/seeker/delOne', data)

//update
export const reqUpdOneSeeker = async (data) => await instance.put('/seeker/updOne', data)

/**
 *归属地
 */
// 获取所有
export const reqAllPosition = async () => await instance.get('/position')

/**
 *烈士
 */
// 获取所有
export const reqAllMartyr = async () => await instance.get('/martyr')
// 获取一个根据id
export const reqOneMartyr = async (data) => await instance.get('/martyr/one', { params: data })

//添加一名烈士
export const reqAddOneMartyr = async (data) => await instance.put('/martyr/addOne', data)

//del
export const reqDelMartyr = async (data) => await instance.post('/martyr/delOne', data)

//update
export const reqUpdOneMartyr = async (data) => await instance.put('/martyr/updOne', data)

/**
 *烈士陵园
 */
// 获取所有
export const reqAllMartyrCemetery = async () => await instance.get('/martyrCemetery')
// 获取一个根据id
export const reqOneMartyrCemetery = async (data) => await instance.get('/martyrCemetery/one', { params: data })

//添加一名烈士
export const reqAddOneMartyrCemetery = async (data) => await instance.put('/martyrCemetery/addOne', data)

//del
export const reqDelMartyrCemetery = async (data) => await instance.post('/martyrCemetery/delOne', data)

//update
export const reqUpdOneMartyrCemetery = async (data) => await instance.put('/martyrCemetery/updOne', data)

