FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

WORKDIR /src
COPY *.csproj .
RUN dotnet restore

COPY . .
RUN dotnet build -o /app 
RUN dotnet publish -o /publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
COPY --from=build /publish /app
WORKDIR /app
CMD ["./api"]