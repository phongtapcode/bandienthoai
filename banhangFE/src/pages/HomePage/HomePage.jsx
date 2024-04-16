import Card from "../../components/Card/Card";
import Carousel from "../../components/Carousel/Carousel";
import { useQuery } from "@tanstack/react-query";
import * as ProductService from "../../services/ProductService";
import "./HomePage.scss";

function HomePage() {
  //useQuery là một hook từ thư viện React Query, được sử dụng để gọi một hàm hoặc một promise và quản lý trạng thái của dữ liệu kết quả. Nó nhận vào một mảng dependencies, trong đó:
  //Phần tử đầu tiên là một key, được sử dụng để xác định dữ liệu trong bộ nhớ cache của React Query.
  //Phần tử thứ hai là một hàm hoặc promise mà useQuery sẽ gọi để lấy dữ liệu. Trong trường hợp này, đó là fetchProductAll.
  //Phần tử thứ ba là một đối tượng options, trong đó bạn có thể cung cấp các tuỳ chọn như retry và retryDelay.

  const fetchProductAll = async () => {
    const res = await ProductService.getAllProduct();
    return res;
  };
  //retry: Xác định số lần thử lại khi có lỗi xảy ra khi gọi API.
  const { isLoading, data } = useQuery({
    queryKey: ['product'],
    queryFn: fetchProductAll, // Sử dụng queryFn để truyền hàm lấy dữ liệu
    config: { retry: 3, retryDelay: 1000 }
  });
  
  console.log(data);

  return (
    <main className="main">
      <div className="main__content">
        <div className="main__content__left">
          <div className="main__content__left--carousel">
            <Carousel />
          </div>
          <div className="main__content__left--image">
            <img src="/src/assets/image/tragopimg1.jpg" />
            <img src="/src/assets/image/tragopimg2.jpg" />
          </div>
        </div>
        <div className="main__content__right">
          <img src="/src/assets/image/phukiengiamgia.jpg" />
        </div>
      </div>

      <div className="main__product">
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </main>
  );
}

export default HomePage;
