/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { getRepository, Repository } from 'typeorm'
import { Resolver, Query, Arg, Mutation } from 'type-graphql'

import { User } from '../../database/entities/user'
import { CreateUserInput } from '../input-types/create-user-input'
import { UpdateUserInput } from '../input-types/update-user-input'

@Resolver((of) => User)
export class UserResolver {
  private readonly repository: Repository<User>

  constructor() {
    this.repository = getRepository(User)
  }

  @Query((returns) => User, { nullable: true })
  async user(@Arg('id') id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id)

    if (!user) {
      throw new Error('User not found')
    }

    return user
  }

  @Query((returns) => [User])
  async users(): Promise<User[]> {
    return await this.repository.find()
  }

  @Mutation((returns) => User)
  async createUser(@Arg('input') input: CreateUserInput): Promise<User> {
    const newUser = this.repository.create(input)

    return await this.repository.save(newUser)
  }

  @Mutation((returns) => User)
  async updateUser(@Arg('id') id: string, @Arg('input') input: UpdateUserInput): Promise<User> {
    const user = await this.repository.findOne(id)

    if (!user) {
      throw new Error('User not found')
    }

    const updatedUser = {
      ...user,
      ...input,
    }

    return await this.repository.save(updatedUser)
  }
}
