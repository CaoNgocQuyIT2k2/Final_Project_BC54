import { https } from "../../service/config";
import { message } from "antd";
import { SET_INFO } from "../constant/user";
import { TURN_OFF, TURN_ON } from "../constant/spinner";

export let loginAction = (values, navigate) => {
  return (dispatch) => {
    dispatch({
      type: TURN_ON,
    });
    https
      .post("/api/Users/signin", values)
      .then((res) => {
        message.success("Login redux thunk thành công");
        let dataJson = JSON.stringify(res.data.content);
        localStorage.setItem("USER_INFO", dataJson);
        message.success("login thành công");
        //đẩy thông tin user lên redux
        dispatch({
          type: TURN_OFF,
        });
        dispatch({
          type: SET_INFO,
          payload: res.data.content,
        });
        navigate("/");
      })
      .catch((err) => {
        console.log(" 😂 ~ return ~ err:", err);
        message.error("Login redux thunk thất bại ");
        dispatch({
          type: TURN_OFF,
        });
      });
  };
};
