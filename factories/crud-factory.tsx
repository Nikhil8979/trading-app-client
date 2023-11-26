import axios from "axios";
// import { setError, setLoading } from "../redux/slices/commonSlice";
import store from "../redux/store";
const FormData = require("form-data");
export class CrudFactory {
  store;
  constructor(store) {
    this.store = store;
  }

  async post(url, data = {}, token, notify) {
    return this.send({
      method: "POST",
      url,
      data,
      token,
      notify,
    });
  }
  async get(url, data = {}, token, notify) {
    return this.send({
      method: "GET",
      url,
      data,
      token,
      notify,
    });
  }
  async put(url, data = {}, token, notify) {
    return this.send({
      method: "PUT",
      url,
      data,
      token,
      notify,
    });
  }
  async patch(url, data = {}, token, notify) {
    return this.send({
      method: "PATCH",
      url,
      data,
      token,
      notify,
    });
  }
  async delete(url, data = {}, token, notify) {
    return this.send({
      method: "DELETE",
      url,
      data,
      token,
      notify,
    });
  }

  getPermission() {
    const { user } = this.store.getState("user");
    const { userDetails } = user;
    return userDetails?.permissions;
  }

  getUser() {
    const { user } = this.store.getState("user");
    return user;
  }

  hasPermission(code) {
    const permissions = this.getPermission();
    const isPermission = permissions?.map((perm) =>
      perm?.permissions?.includes(code)
    );

    return !!isPermission?.includes(true);
  }
  async setLoader(loading) {
    this.store.dispatch(setLoading(loading));
  }

  async setNotificationError(error) {
    this.store.dispatch(setError(error));
  }

  async send({ method, url, data, token, notify = true }) {
    const options = {
      method,
    };

    options.headers = {
      Accept: "application/json",
      AccessControlAllowOrigin: "*",
      Authorization: `Bearer ${token}`,
    };

    if (!(data instanceof FormData)) {
      options.headers["Content-Type"] = "application/json";
    }
    if (options.method === "GET") {
      options.params = data;
    } else {
      options.data = data;
    }

    try {
      try {
        this.setLoader(true);
        const response = await axios(url, options);
        const { data, status } = response;

        if (data.type === "error") {
          throw new Error(data.message);
        }
        this.setLoader(false);
        if (method !== "GET" && notify) {
          this.setNotificationError({
            type: data?.status === 1 ? "success" : "error",
            message: response.data.message,
          });
        }

        return response;
      } catch (error) {
        this.setLoader(false);

        throw error;
      } finally {
        this.setLoader(false);
      }
    } catch (error) {
      this.setLoader(false);

      this.setNotificationError({
        type: "error",
        message: error.response?.data?.message || error.message,
      });
      throw error.response?.data?.message || error.message;
    }
  }
}

export const $crud = new CrudFactory(store);
