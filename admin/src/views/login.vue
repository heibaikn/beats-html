<style lang="less">
@import "./login.less";
</style>

<template>
  <div class="login" @keydown.enter="handleSubmit">
    <div class="login-con">
      <Card :bordered="false">
        <p slot="title">
          <Icon type="log-in"></Icon>欢迎登录
        </p>
        <div class="form-con">
          <Form ref="loginForm" :model="form" :rules="rules">
            <FormItem prop="userName">
              <Input v-model="form.userName" placeholder="请输入用户名">
                <span slot="prepend">
                  <Icon :size="16" type="person"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem prop="password">
              <Input type="password" v-model="form.password" placeholder="请输入密码">
                <span slot="prepend">
                  <Icon :size="14" type="locked"></Icon>
                </span>
              </Input>
            </FormItem>
            <FormItem>
              <Button @click="handleSubmit" type="primary" long>登录</Button>
            </FormItem>
          </Form>
        </div>
      </Card>
    </div>
  </div>
</template>

<script>
import Cookies from "js-cookie";
import md5 from "@/libs/md5";

export default {
  data() {
    return {
      form: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "账号不能为空", trigger: "blur" }
        ],
        password: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSubmit() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.requestLogin()
            .then(d => {
              console.log("d.adminRole", d.adminRole);
              alert;
              if (d.adminRole >= "0") {
                let identity = -1;
                if (d.adminRole == "0") {
                  identity = 1;
                } else if (d.adminRole == "1") {
                  identity = 2;
                } else if (d.adminRole == "2") {
                  identity = 3;
                }
                Cookies.set("identity", identity, { expires: 3 });
              } else {
                alert("没有找到相关权限用户");
                return;
              }

              Cookies.set("user", this.form.userName, { expires: 3 });
              Cookies.set("token", d.token, { expires: 3 });
              this.$store.commit(
                "setAvator",
                "https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=3448484253,3685836170&fm=27&gp=0.jpg"
              );
              // if (this.form.userName === 'iview_admin') {
              //     Cookies.set('access', 0);
              // } else {
              //     Cookies.set('access', 1);
              // }
              // this.$router.push({
              //     name: 'home_index'
              // });
              location.reload();
            })
            .catch(e => {});
        }
      });
    },
    requestLogin() {
      let data = {
        password: md5(this.form.password).toLocaleUpperCase(),
        userName: this.form.userName
      };
      return this.api.adminLogin(data);
    }
  }
};
</script>

<style>
</style>
