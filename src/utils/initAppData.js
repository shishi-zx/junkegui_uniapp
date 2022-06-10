import store from '../store/index'
import {reqMenus,reqLogin} from '../api/index'

// 登录成功后，初始化app数据
// 登录用户的信息
// 所能获取到的菜单项
export default async function initMenu(user,password){
    let userRes = await reqLogin({user,password})
    let menusRes = await reqMenus()
    if(userRes.code==200){
        store.commit('initUser',userRes.data)
    }
    if(menusRes.code==200){
        let m1 = []
        let m2 = []
        menusRes.data.forEach(e => {
            if(e.type==1){
                m1.push(e)
            }else{
                m2.push(e)
            }
        });
        store.commit('initMenu',menusRes.data)
        store.commit('init_dispatch_menu_list',m1)
        store.commit('init_system_menu_list',m2)
    }
}