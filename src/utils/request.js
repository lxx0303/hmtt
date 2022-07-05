/**
 * 封装 axios 请求模块
 */
import axios from "axios";

// 创建 axios 实例
const request = axios.create({
  baseURL: "http://42.192.129.12:8000/", // 基础路径
});

export default request;
