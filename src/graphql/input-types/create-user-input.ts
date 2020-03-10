import { InputType, Field } from 'type-graphql'

import { User } from 'src/database/entities/user'

@InputType()
export class CreateUserInput implements Partial<User> {
  @Field()
  firstName: string

  @Field()
  lastName: string

  @Field()
  age: number
}
