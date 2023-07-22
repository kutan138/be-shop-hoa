import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Param,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import FindOneParams from "src/common/utilities/findOneParams";
import JwtAuthenticationGuard from "src/modules/authentication/jwt-authentication.guard";
import RequestWithUser from "src/modules/authentication/requestWithUser.interface";
import CreateOrderDto from "./dto/createOrder.dto";
import PostEntity from "./entities/order.entity";
import { OrderService } from "./order.service";
import OrderItem from "./entities/order-item.entity";

@Controller("order")
@ApiTags("order")
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  async getAllOrderByUser(@Req() req: RequestWithUser) {
    return this.orderService.getAllOrdersByUser(req.user.id);
  }

  @Get(":id")
  @ApiParam({
    name: "id",
    required: true,
    description: "Should be an id of a post that exists in the database",
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: "A order has been successfully fetched",
    type: PostEntity,
  })
  @ApiResponse({
    status: 404,
    description: "A order with given id does not exist.",
  })
  getOrderByUserIdAndOrderId(
    @Param() { id }: FindOneParams,
    @Req() req: RequestWithUser
  ) {
    return this.orderService.findOrdersByUserIdAndOrderId(
      req.user.id,
      Number(id)
    );
  }

  @Post()
  @UseGuards(JwtAuthenticationGuard)
  async createPost(
    @Body() orderItems: OrderItem[],
    @Req() req: RequestWithUser
  ) {
    return this.orderService.createOrderByUser({ orderItems }, req.user.id);
  }
}
