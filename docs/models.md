# Models

## Users

- id :string
- firstName : string
- lastName : string
- password : string
- Email : string
- Role: enum<string>

## Content / Blog (post)

- ID :string
- Title : string
- Description : string
- Image:string
- Author(useriD):string
- Tags: enum<string>
- Category:string
- CreatedAt:timestamp
- UpdatedAt: timestamp

## Activity/Logs

- id : string
- perfomedBy(userID) :sting
- performedAt(DATE) : timestamp
- ACTION {crud + auth} : string
