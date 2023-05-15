This template features a QueryParser, which is a tool designed to convert the query data we send via HTTP into a valid format for querying within our application.

## **"Module Declarations"**

> Note: By default, when generating a module, it will already be present.

1. "We define **QueryParsedFactory** as a provider in the module where we plan to utilize it."
2. In the module's controller, we need to invoke QueryParsed in the constructor.
	- Step 2 Reference

        ```typescript
        constructor( createEjemploUseCase: CreateEjemplo,getAllEjemplosUseCase: GetAllEjemplos,
        readonly queryParserFactory: QueryParserFactory,
        ) {
        		this.createEjemploUseCase = createEjemploUseCase;
        		this.getAllEjemplosUseCase = getAllEjemplosUseCase;
        }
        ```

3. We declare the strategy that we are going to use.

	> Note: By strategy, we refer to the database driver that we are going to use, in this case MongoDB. As we implement new database compatibility, we simply need to create new drivers.

4. We call the **getDriver** method to call the driver corresponding to the strategy we have declared.
5. Finally, we call the **parseRequest** method and pass the controller's request as an argument.

- References to steps 3, 4, 5.

	```typescript
        async getAllEjemplos(@Req() request): Promise<EjemploResponseDto[]> {
                try {
        			this.queryParserFactory.strategy = ParsingStrategy.MONGODB;
                    const driver = this.queryParserFactory.getDriver();
                    const queryParsed = driver.parseRequest(request);

                    const ejemplosCollection = await this.getAllEjemplosUseCase.handler(queryParsed);
                    return ejemplosCollection.map(ejemplo => new EjemploResponseDto(ejemplo));
                } catch (error) {
                    throw new Error(error.message);
                }
            }
    ```

## Expected Format
In order to properly parse or transform the queries we make, we need to use the following options:

- **_page:** when we want to paginate.
- **_limit:** to limit the number of elements we want to display on the screen. If combined with _page, it provides pagination functionality.
- **_sort:** indicates the field by which we want to sort.
- **_order:** specifies the order ('asc', 'desc').
- **_show:** indicates the fields we want to display. In MongoDB terms, it corresponds to projection.

    > Note: When using _show, if our DTO expects a field and it is omitted, functions such as transformations used in @Transform() that expect values will throw errors.

- **_embed:** when we want to display related fields. This is mainly used in MongoDB for 'populated' operations.
- **Filters:** to filter, we need to send the field we want to filter in the format `field=value` or `field_like=value` or `field_in=value`, depending on the requirements."