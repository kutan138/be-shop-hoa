import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/modules/user/user.entity";
import { Repository } from "typeorm";
import { ProductService } from "../product/product.service";
import CreateOrderDto from "./dto/createOrder.dto";
import Order from "./entities/order.entity";
import OrderNotFoundException from "./exceptions/NotFound.exception";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private readonly productsService: ProductService
  ) {}

  async getAllOrdersByUser(userId: User["id"]) {
    const queryBuilder = this.orderRepository
      .createQueryBuilder("order")
      .where("order.customerId = :userId", { userId });

    const [items, count] = await queryBuilder
      .orderBy("order.id", "ASC")
      .getManyAndCount();

    return { items, count };
  }

  async findOrdersByUserIdAndOrderId(userId: User["id"], orderId: Order["id"]) {
    const order = await this.orderRepository
      .createQueryBuilder("order")
      .where("order.id = :orderId", { orderId })
      .andWhere("order.customerId = :userId", { userId })
      .getOne();

    if (order) {
      return order;
    }

    throw new OrderNotFoundException(orderId);
  }

  async createOrderByUser(
    createOrderDto: CreateOrderDto,
    customerId: User["id"]
  ): Promise<CreateOrderDto> {
    // Check if the products in the order exist
    const productIds = createOrderDto.orderItems.map((item) => item.productId);
    const products = await this.productsService.checkIfProductsExist(
      productIds
    );

    if (!products || products.length != productIds.length) {
      throw new UnprocessableEntityException(
        "The order could not be processed"
      );
    }

    const newOrder = new Order();
    newOrder.orderItems = createOrderDto.orderItems;
    newOrder.customerId = customerId;

    return this.orderRepository.save(newOrder);
  }
}
