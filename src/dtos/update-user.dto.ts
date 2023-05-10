import { IsNumber, IsOptional, IsString, Matches, Max, Min } from "class-validator";

export default class UpdateUserDto {
  @IsString()
  @IsOptional()
  firstname: string;
  @IsString()
  @IsOptional()
  lastname: string;
  @IsNumber()
  @IsOptional()
  @Min(1)
  @Max(100)
  age: number;
  @IsString()
  @IsOptional()
  @Matches(/^[0-9]{3}:[0-9]{3}$/, {
    message:
      "Coordinate must be format xxx:yyy, x and y must be number form 0 to 9",
  })
  coordinate: string;
}
