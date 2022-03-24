/*
 * @Author: your name
 * @Date: 2021-06-05 15:23:46
 * @LastEditTime: 2021-11-24 11:27:06
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /soft-otp-admin/src/assets/lang/zh.js
 */

module.exports = {
  confirm: {
    remove: "是否确认删除?",
    cancel: "是否取消?",
  },
  button: {
    save: "保存",
    cancel: "取消",
    delete: "删除",
    edit: "编辑",
    commit: "提交",
    modify: "修改",
    export: "导出",

  },
  column: {
    state: "状态",
    created: "创建时间",
    edited: "修改时间",
    operations: "操作",

    role: {
      name: "角色名",
      desc: "职责描述",
    },
    user: {
      name: "用户名",
      mobile: "手机",
      mail: "邮箱",
      state: "状态",
    },
    token: {
      sn: "序列号",
      timeOffset: "时间偏移",
      created: "创建时间",
      errorCount: "错误次数",
      errorDate: "错误时间",
    },
    syslog: {
      name: "用户名",
      type: "操作类型",
      request: "请求参数",
      response: "响应数据",
      ipaddr: "IP地址",
      operated: "操作时间",
    },
  },
  home: {
    menu: {
      log: "日志管理",
      user: "个人日志",
      dm: "部门日志",
      pm: "项目日志",
      pmo: "PMO",
      worktime: "工时统计",
      staff: "员工工时",
      proj_stats: "项目工时统计",
      cmt_stats: "提交统计",
      proj: "项目信息",
      prod: "产品信息",
      user_role: '用户角色',
      settings: "系统配置",
    },
  },
  project: {
    title: '创建项目信息',
    button: {
      save: "保存修改",
      create: '创建',
      cancel: '取消',
      add: '新建项目',
    },
    form: {
      number: '项目编号',
      name: '项目名',
      manager: '项目经理',
      status: '项目状态',
      remark: '备注',
      parent: '父项目'
    },
    tips: {
      number: '请输入项目编号',
      name: '请输入项目名',
      manager: '请选择项目经理',
      status: '请设置项目状态',
      parent: '请选择父项目'
    }
  },
  product: {
    title: '创建产品信息',
    button: {
      save: "保存修改",
      create: '创建',
      cancel: '取消',
      add: '新建产品',
    },
    form: {
      model: '产品型号',
      name: '产品名',
      line: '产品线',
      status: '产品状态',
      remark: '备注',
    },
    tips: {
      model: '请输入产品型号',
      name: '请输入产品名',
      manager: '请输入产品线名',
      status: '请设置项目状态',
    }
  },
  user_role: {
    column: {
      number: '员工编号',
      name: '员工姓名',
      depart: '部门',
      is_pmo: 'PMO',
      is_pm: "项目经理",
      is_dm: "部门经理",
      is_cm: "提交者",
    }
  },
  report: {
    button: {
      submit: "提交",
      save: "保存",
    },
    column: {
      day: "日期",
      line: "产品线",
      proj: "项目",
      prod: "产品",
      name: "任务名",
      cost: "工时",
      detail: "任务详情",
      user: "姓名",
      depart: "部门",
      oday: "报告日期",
      cday: "提交日期",
    },
  },
  task: {
    title: {
      create: "新建任务",
    },
    tips: {
      name: "请填写任务名",
      detail: "请填写任务详情",
      cost: "请填写任务耗时",
      proj: "请选择相关项目",
      prod: "请选择相关产品",
    },
    button: {
      create: "确定",
      cancel: "取消",
      add: "新建任务",
      paste: "粘贴任务",
    },
    label: {
      name: "任务名",
      detail: "任务详情",
      cost: "任务耗时",
      proj: "项目",
      prod: "产品",
    },
  },
  operation: {
    message: {
      selectSn: "请选择一个序列号",
    },
    sn_selector: {
      label: "令牌序列号",
      placeholder: "选择一个序列号",
    },
    revive: {
      title: "还原",
      code: "还原码",
      button: "获取还原码",
    },
    unlock: {
      title: "解锁",
      button: "解锁",
      label: {
        lock: "锁定码",
        unlock: "解锁码",
      },
      placeholder: {
        lock: "锁定码",
        unlock: "请在软令牌输入上面的锁定码以获得解锁码",
      },
      tips: {
        lock: "锁定码不能为空",
        unlock: "解锁码不能为空",
      },
      message: {
        success: "解锁成功",
      },
    },
    authenticate: {
      title: "认证",
      button: {
        primary: "认证",
        challenge: "生成挑战码",
      },
      label: {
        challenge: "挑战码",
        otp: "动态口令",
      },
      placeholder: {
        challenge: "请输入挑战码",
        otp: "请输入动态口令",
      },
      tips: {
        otp: "动态口令不能为空",
      },
      message: {
        success: "认证成功",
      },
    },
    synchronize: {
      title: "同步",
      button: "同步",
      label: {
        otp1: "当前动态口令",
        otp2: "下一条动态口令",
      },
      placeholder: {
        otp1: "请输入当前动态口令",
        otp2: "请输入下一条动态口令",
      },
      tips: {
        otp: "动态口令不能为空",
      },
      message: {
        success: "同步完成",
      },
    },
  },
  error: {
    tips: {
      login: {
        success: "登录成功",
        failed: "登录失败",
      },
      auth: {
        timeout: "认证超时",
      },
      register: {
        success: "激活链接已发送到注册邮箱, 请访问链接以激活账号",
      },
      token: {
        invalid: "登录凭证已经失效, 即将跳转到登录页面",
      },
      connect: {
        timeout: "连接超时",
      },
    },
  },
  settings: {
    info: {
      menu: "用户信息",
      title: "用户信息",
      placeholder: {
        name: "昵称",
        mobile: "手机号",
        mail: "邮箱",
        desc: "个人简介",
      },
    },
    password: {
      menu: "修改密码",
      title: "修改密码",
      label: {
        origin: "原密码",
        newp: "新密码",
        confirm: "确认密码",
      },
      placeholder: {
        origin: "请输入原密码",
        newp: "请输入新密码",
        confirm: "请输入确认密码",
      },
      tips: {
        diff: "原密码和新密码不能相同",
        same: "确认密码和新密码不一致",
      },
    },
  },
  login: {
    title: "工作日志系统",
    placeholder: {
      username: "工号",
      password: "密码",
    },
    label: {
      remember: "记住我",
    },
    button: {
      login: "登录",
    },
    link: {
      register: "注册!",
    },
    tips: {
      password: "请输入OA密码!",
      username: "请输入OA工号!",
    },
  },
  register: {
    title: "注册账号",
    label: {
      mail: "邮件",
      password: "密码",
      confirm: "确认密码",
      nickname: "昵称",
      mobile: "电话",
    },
    button: {
      register: "注册",
      login: "继续登录",
    },
    tips: {
      mail: "请输入邮箱!",
      valid_mail: "请输入有效的邮箱地址!",
      password: "请输入密码!",
      confirm: "请输入确认密码!",
      nickname: "请输入昵称!",
      mobile: "请输入电话!",
    },
  },
};
