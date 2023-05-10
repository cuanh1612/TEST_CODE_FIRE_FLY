import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Max,
  Min,
} from "class-validator";

export default class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  firstname: string;
  @IsString()
  @IsNotEmpty()
  lastname: string;
  @IsNumber()
  @Min(1)
  @Max(100)
  age: number;
  @IsString()
  @IsNotEmpty()
  @Matches(/^[0-9]{3}:[0-9]{3}$/, {
    message:
      "Coordinate must be format xxx:yyy, x and y must be number form 0 to 9",
  })
  coordinate: string;
}
