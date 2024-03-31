import { BadRequestException } from "@nestjs/common";

export const validateIdFormat = (id: string) => {
    if(
        !id.match(
            /^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i,
        )
    ) {
        throw new BadRequestException(`User id ${id} is in wrong format`);
    }
}