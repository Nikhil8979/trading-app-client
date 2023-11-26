"use client";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {
  Alert,
  AlertColor,
  Grid,
  LinearProgress,
  Snackbar,
  Switch,
  TextField,
} from "@mui/material";
import PaginationItem from "@mui/material/PaginationItem";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import axios from "axios";
import Pagination from "react-js-pagination";
import { debounce } from "lodash";
import { useRouter } from "next/navigation";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#1565c0",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

interface error {
  type: string | undefined;
  message: string;
}
export default function UsersPage() {
  const [users, setUsers] = React.useState<
    Partial<
      [
        {
          _id?: string | undefined;
          name?: string;
          email?: string;
          contact_number?: number;
          active?: boolean;
        }
      ]
    >
  >([{}]);
  const [limit, setLimit] = React.useState(10);
  const [page, setPage] = React.useState(1);
  const [loading, setLoading] = React.useState(false);
  const [totalCount, setTotalCount] = React.useState(0);
  const [error, setError] = React.useState<Partial<error>>({});
  const [alertType, setAlertType] = React.useState<string>("success");

  const router = useRouter();

  const getUsers = async (search: string) => {
    try {
      setLoading(true);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;

      const { data } = await axios.get(
        `http://localhost:7000/api/retrieve/users?limit=${limit}&page=${page}&search=${search}`
      );
      console.log(data);
      setUsers(data?.data?.users);
      setLoading(false);
      setTotalCount(data?.data?.total);
    } catch (err) {
      if (err) {
        if (err instanceof Error && "response" in err) {
          const response: any = err.response;
          if (response?.status === 401) {
            router.push("/admin/login");
          }
        }
      }
    }
  };

  const udpdateAccount = async (id: string | undefined) => {
    try {
      setLoading(true);
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      const { data } = await axios.put(
        "http://localhost:7000/api/update/account",
        { id }
      );
      if (data?.type === "success") {
        setAlertType("success");
        setError({ type: "success", message: data?.message });
      }
      await getUsers("");
      setLoading(false);
    } catch (err) {
      setLoading(false);
      console.log(err, "--- account error ----");
    }
  };

  const setSearch = debounce(getUsers, 300);
  React.useEffect(() => {
    getUsers("");
  }, [page, limit]);
  React.useEffect(() => {
    console.log(error);
  }, [error]);
  const severity: AlertColor | undefined = React.useMemo(
    () =>
      typeof alertType && ["success", "error", "warning"].includes(alertType)
        ? (alertType as AlertColor)
        : undefined,
    [alertType]
  );
  return (
    <>
      <div className="px-3">
        <h1 className="mt-2 text mt-2">Users</h1>

        <Grid container className="d-flex justify-content-end">
          <Grid item md={3} className="d-flex justify-content-end">
            <TextField
              InputLabelProps={{ shrink: true }}
              fullWidth
              type="text"
              onChange={(e) => setSearch(e.target.value)}
              size="small"
              label="search"
            />
          </Grid>
        </Grid>
        <TableContainer className="mt-2" component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Phone Number</StyledTableCell>
                <StyledTableCell align="right">Action</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users?.map((row) => (
                <StyledTableRow key={row?._id}>
                  <StyledTableCell component="th" scope="row">
                    {row?.name ?? "NA"}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row?.email}</StyledTableCell>

                  <StyledTableCell align="right">
                    {row?.contact_number}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    <Switch
                      checked={row?.active}
                      onChange={() => udpdateAccount(row?._id)}
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
          {loading && <LinearProgress color="primary" />}
        </TableContainer>
        <div className="d-flex justify-content-center mt-5">
          <Pagination
            activePage={page}
            itemsCountPerPage={limit}
            totalItemsCount={totalCount}
            onChange={(pageNumber) => setPage(pageNumber)}
            nextPageText={"Next"}
            prevPageText={"Prev"}
            firstPageText={"First"}
            lastPageText={"Last"}
            itemClass="page-item"
            linkClass="page-link"
          />
        </div>
        {!!Object.keys(error).length && (
          <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "right" }}
            open={!!error?.type}
            autoHideDuration={6000}
            onClose={() => {
              setError({});
            }}
          >
            <Alert
              onClose={() => setError({})}
              severity={severity}
              sx={{ width: "100%" }}
            >
              {error?.message}
            </Alert>
          </Snackbar>
        )}
      </div>
    </>
  );
}
