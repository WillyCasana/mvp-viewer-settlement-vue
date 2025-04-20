# Settlement Viewer

Application to query and visualize detailed information of Settlements.

## Features

- Search Settlements by ID
- Detailed visualization of Settlement information
- Multilanguage support (Spanish/English)
- The application can consume Rest API from a back-end

## Technologies Used

- Vue 3 with Composition API and Script Setup
- TypeScript for strong typing
- Quasar Framework for UI components
- Vue Query for request management
- Pinia for state management
- Vue Router for navigation
- i18n for internationalization

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Production Build

```bash
npm run build
```

## Usage

1. Enter a Settlement ID in the text field
2. Click on "Query" to search for the Settlement
3. View the detailed information of the Settlement


## Consider the following for the Back-end
- Configure CORS
- If using >= .Net 6, in program.cs include:
```bash
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});
```
```bash
app.UseCors("AllowAll");