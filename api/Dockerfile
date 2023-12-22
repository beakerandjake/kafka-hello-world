FROM mcr.microsoft.com/dotnet/sdk:8.0
WORKDIR /api

COPY *.csproj .
RUN dotnet restore

COPY . .
RUN dotnet build -o /app
RUN dotnet publish -o /publish
WORKDIR /publish
CMD ["./api"]