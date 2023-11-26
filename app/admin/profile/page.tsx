"use client";
import { Button, LinearProgress } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
export default function Profile() {
  const [params, setParams] = useState<
    Partial<{
      name?: string;
      email?: string;
      contact_number?: string;
    }>
  >({});
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const getProfile = async () => {
    try {
      setLoading(true);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;

      const { data } = await axios.get(
        `https://trading-app-service.onrender.com/api/retrieve/user-profile`
      );
      setLoading(false);
      setParams(data?.data);
    } catch (err) {
      if (err) {
        setLoading(false);
        if (err instanceof Error && "response" in err) {
          const response: any = err.response;
          if (response?.status === 401) {
            router.push("/admin/login");
          }
        }
      }
    }
  };

  const updateProfile = async (params: any) => {
    try {
      setLoading(true);

      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;

      await axios.put(
        `https://trading-app-service.onrender.com/api/update/me/profile`,
        {
          ...params,
          id: params?._id,
        }
      );
      setLoading(false);

      await getProfile();
    } catch (err) {
      if (err) {
        setLoading(false);
        if (err instanceof Error && "response" in err) {
          const response: any = err.response;
          if (response?.status === 401) {
            router.push("/admin/login");
          }
        }
      }
    }
  };
  const onChange = (
    e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setParams((prev) => {
      return { ...prev, [name]: value };
    });
  };
  useEffect(() => {
    getProfile();
  }, []);

  return (
    <div>
      {loading && <LinearProgress color="primary" />}

      <div className="container container-fluid">
        <div className="row wrapper">
          <div className="col-12">
            <form
              className="shadow-lg"
              //   onSubmit={submitHandler}
            >
              <h1 className="mb-3">Update Profile</h1>

              <div className="form-group">
                <label htmlFor="name_field">Name</label>
                <input
                  type="text"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={params?.name}
                  onChange={onChange}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  disabled={true}
                  value={params?.email}
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile</label>
                <input
                  type="text"
                  id="mobile"
                  className="form-control"
                  name="contact_number"
                  value={params?.contact_number}
                  onChange={onChange}
                />
              </div>
              <Button
                className="mt-3"
                variant="contained"
                disabled={loading}
                onClick={async () => {
                  await updateProfile(params);
                }}
                fullWidth
                size="medium"
              >
                {loading ? "Updating..." : "Update"}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
