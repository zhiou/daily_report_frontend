/*
 * @Author: your name
 * @Date: 2021-06-21 10:30:23
 * @LastEditTime: 2021-06-21 11:32:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /soft-otp-admin/src/lang/index.js
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

// 国际化
const i18n = new VueI18n({
  locale: 'zh', // set locale
  messages: {
    zh: require('./lang/zh.js'), // 中文语言包
    en: require('./lang/en.js') // 英文语言包
  }
})

export default i18n