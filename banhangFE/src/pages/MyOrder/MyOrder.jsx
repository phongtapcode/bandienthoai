import "./MyOrder.scss";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../components/Loading/Loading";
import * as message from "../../components/Message/Message";
import * as OrderService from "../../services/OrderService";
import { useSelector } from "react-redux";

function MyOrder() {
  const user = useSelector((state) => state?.dataUser);
  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderByUserId(user?.access_token, user?.id);
    return res;
  };

  const queryOrder = useQuery({
    queryKey: ["order"],
    queryFn: fetchMyOrder,
    config: { retry: 3, retryDelay: 1000 }
  });

  const { isLoading, data } = queryOrder;
console.log(data);
  return (
    <Loading isLoading={isLoading}>
      <main>Myorder</main>
    </Loading>
  );
}

export default MyOrder;
