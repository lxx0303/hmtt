<template>
  <div class="login-container">
    <van-nav-bar title="登录" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="rules.mobile"
        required
        type="number"
        maxlength="11"
      >
        <template #left-icon>
          <TouTiaoIcon icon="shouji"></TouTiaoIcon>
        </template>
      </van-field>
      <van-field
        v-model="user.code"
        name="code"
        placeholder="请输入验证码"
        :rules="rules.code"
        required
        type="number"
        maxlength="6"
      >
        <template #left-icon>
          <TouTiaoIcon icon="yanzhengma"></TouTiaoIcon>
        </template>
        <template #button>
          <van-count-down
            @finish="isShowCountDown = false"
            v-if="isShowCountDown"
            :time="5000"
            format="ss s"
          />
          <van-button
            v-else
            :loading="isDisabled"
            native-type="button"
            class="send-sms-btn"
            size="mini"
            @click="sendSmsCode"
            >获取验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
import { getSmsCode, setLogin } from "@/api/user";
export default {
  name: "LoginPage",
  components: {},
  props: {},
  data() {
    return {
      // username: "",
      // password: "",
      user: {
        mobile: "13911111111",
        code: "246810",
      },
      rules: {
        mobile: [
          {
            required: true,
            message: "手机号不能为空",
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: "手机号格式不对",
          },
        ],
        code: [
          {
            required: true,
            message: "验证码不能为空",
          },
          {
            pattern: /^\d{6}$/,
            message: "验证码只能6位",
          },
        ],
      },
      isShowCountDown: false,
      isDisabled: false,
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onSubmit() {
      try {
        const res = await setLogin(this.user);
        console.log(res);
        this.$toast.success("登陆成功");
      } catch (e) {
        this.$toast.fail(e?.reponse?.data?.message || "服务器端错误");
      }
    },
    async sendSmsCode() {
      try {
        await this.$refs.form.validate("mobile");
      } catch (e) {
        console.log(e);
        return;
      }
      try {
        // button 合适的时机添加disabled
        // 展示倒计时
        this.isDisabled = true;
        await getSmsCode(this.user.mobile);
        this.isShowCountDown = true;
        this.$toast.success("发送验证码成功");
        // 验证完成之后在发送
      } catch (e) {
        this.$toast.fail(e.response.data.message || "出错了");
        this.isShowCountDown = false;
      } finally {
        // 不管成功或者失败都会执行的逻辑
        this.isDisabled = false;
      }
    },
  },
};
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 152px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
}
</style>
