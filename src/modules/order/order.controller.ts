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
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiResponse,
  ApiTags,
} from "@nestjs/swagger";
import FindOneParams from "src/common/utilities/findOneParams";
import JwtAuthenticationGuard from "src/modules/authentication/jwt-authentication.guard";
import RequestWithUser from "src/modules/authentication/requestWithUser.interface";
import OrderItem from "./entities/order-item.entity";
import PostEntity from "./entities/order.entity";
import { OrderService } from "./order.service";
import createOrderDto from "./dto/createOrder.dto";

@Controller("order")
@ApiTags("order")
@UseInterceptors(ClassSerializerInterceptor)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get()
  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth("access-token")
  async getAllOrderByUser(@Req() req: RequestWithUser) {
    return this.orderService.getAllOrdersByUser(req.user.id);
  }

  @Get(":id")
  @UseGuards(JwtAuthenticationGuard)
  @ApiBearerAuth("access-token")
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
  @ApiBearerAuth("access-token")
  @ApiBody({ type: createOrderDto })
  async createOrder(
    @Body() createOrderDto: createOrderDto,
    @Req() req: RequestWithUser
  ) {
    return this.orderService.createOrderByUser(createOrderDto, req.user.id);
  }
}
