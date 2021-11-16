/*
 * @Author: your name
 * @Date: 2021-06-05 15:23:50
 * @LastEditTime: 2021-11-16 15:43:02
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: /soft-otp-admin/src/assets/lang/en.js
 */

module.exports = {
  confirm: {
    remove: "Sure to delete?",
    cancel: "Sure to cancel?",
  },
  button: {
    save: "Save",
    cancel: "Cancel",
    delete: "Delete",
    edit: "Edit",
    commit: "Commit",
    modify: "Modify",
  },
  column: {
    state: "state",
    created: "Created On",
    edited: "Edited On",
    operations: "Operations",
    role: {
      name: "Role Name",
      desc: "Description",
    },
    user: {
      name: "User Name",
      mobile: "Mobile",
      mail: "Email",
      state: "State",
    },
    token: {
      sn: "Seiral Number",
      timeOffset: "Time Offset",
      created: "Created Date",
      errorCount: "Error Count",
      errorDate: "Error Date",
    },
    syslog: {
      name: "User Name",
      type: "Operation Type",
      request: "Request Param",
      response: "Response Data",
      ipaddr: "IP Address",
      operated: "Operation Date",
    },
  },
  home: {
    menu: {
      log: "Log Management",
      user: "User Log",
      dm: "Department Log",
      pm: "Project Log",
      pmo: "PMO",
      worktime: "Work Time",
      staff: "Staff",
      proj_stats: "Project Statistics",
      proj: "Project",
      prod: "Product",
      data_import: "Data Import",
    },
  },
  project: {
    button: {
      save: "Save"
    }
  },
  product: {
    button: {
      save: "Save"
    }
  },
  report: {
    button: {
      submit: "Submit",
      save: "Save",
    }
  },
  operation: {
    message: {
      selectSn: "Please select a serial",
    },
    sn_selector: {
      label: "Token Serial",
      placeholder: "Select a serial",
    },
    revive: {
      title: "Restore",
      code: "Restore Code",
      button: "Get Rstore Code",
    },
    unlock: {
      title: "Unlock",
      button: "Unlock",
      label: {
        lock: "Lock Code",
        unlock: "Unlock Code",
      },
      placeholder: {
        lock: "Lock Code",
        unlock: "Please input the lock code on soft token to get unlock code",
      },
      tips: {
        otp: "Unlock code couldn't be empty",
      },
      message: {
        success: "Unlock succeed",
      }
    },
    authenticate: {
      title: "Authenticate",
      button: {
        primary: "Authenticate",
        challenge: "Generate Challenge Code",
      },
      label: {
        challenge: "Challenge Code",
        otp: "OTP",
      },
      placeholder: {
        challenge: "Please input the challenge code",
        otp: "Please input the OTP",
      },
      tips: {
        otp: "The OTP field couldn't be empty."
      },
      message: {
        success: "Authenticating Succeed",
      }
    },
    synchronize: {
      title: "Synchronize",
      button: "Synchronize",
      label: {
        otp1: "Current OTP",
        otp2: "Next OTP",
      },
      placeholder: {
        otp1: "Please input the current OTP",
        otp2: "Please input the next OTP",
      },
      tips: {
        otp: "The OTP couldn't be empty",
      },
      message: {
        success: "Synchronizing completed",
      }
    }
  },
  error: {
    tips: {
      login: {
        success: 'Login Succeed',
        failed: 'Login Failed',
      },
      auth: {
        timeout: 'Authenticate Timeout',
      },
      register: {
        success: 'Active link is sent, follow the link to activate your account please!',
      },
      token: {
        invalid: 'Token is invalid, it is about to jump to login page',
      },
      connect: {
        timeout: 'Connect Timeout',
      }
    }
  },
  settings: {
    info: {
      menu: "User Info",
      title: "User Info",
      placeholder: {
        name: "Nick Name",
        mobile: "Mobile",
        mail: "Email",
        desc: "Description",
      },
    },
    password: {
      menu: "Change Password",
      title: "Change Password",
      label: {
        origin: "Origin Password",
        newp: "New Password",
        confirm: "Confirm Password",
      },
      placeholder: {
        origin: "Please input origin password",
        newp: "Please input new password",
        confirm: "Please input confirm password",
      },
      tips: {
        diff: "Orgin password and new password should be different",
        same: "Confirm password and new password should be same",
      }
    },
  },
  login: {
    title: "Daily Report Server",
    placeholder: {
      username: "Username",
      password: "Password",
    },
    label: {
      remember: "Remember me",
    },
    button: {
      login: "Login"
    },
    link: {
      register: "Register now!"
    }
  },
  register: {
    title: "Register",
    label: {
      mail: "E-mail",
      password: "Password",
      confirm: "Confirm password",
      nickname: "Nickname",
      mobile: "Phone number",
    },
    button: {
      register: "Register",
      login: "Continue to login",
    },
    tips: {
      mail: "Please input your E-mail!",
      valid_mail: "The input is not valid E-mail!",
      password: "Please input your password!",
      confirm: "Please confirm your password!",
      nickname: "Please input your nickname!",
      mobile: "Please input your phone number!",
    }
  }
};
