using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using VerdeAuraFarms.Api.Services;

namespace VerdeAuraFarms.Api.Extensions;

public sealed class GlobalExceptionHandler(ILogger<GlobalExceptionHandler> logger, IProblemDetailsService problemDetails) : IExceptionHandler
{
    public async ValueTask<bool> TryHandleAsync(HttpContext httpContext, Exception exception, CancellationToken cancellationToken)
    {
        if (exception is ValidationException)
            return await Write(httpContext, StatusCodes.Status400BadRequest, "Invalid request", exception.Message, cancellationToken);
        if (exception is KeyNotFoundException)
            return await Write(httpContext, StatusCodes.Status404NotFound, "Not found", exception.Message, cancellationToken);
        if (exception is ConflictException)
            return await Write(httpContext, StatusCodes.Status409Conflict, "Request already received", exception.Message, cancellationToken);

        logger.LogError(exception, "Unhandled API exception. TraceId={TraceId}", httpContext.TraceIdentifier);
        return await Write(httpContext, StatusCodes.Status500InternalServerError, "Unexpected error", "Something went wrong. Please try again later.", cancellationToken);
    }

    private static async Task<bool> Write(HttpContext context, int status, string title, string detail, CancellationToken cancellationToken)
    {
        context.Response.StatusCode = status;
        var problem = new ProblemDetails { Status = status, Title = title, Detail = detail, Instance = context.Request.Path };
        problem.Extensions["traceId"] = context.TraceIdentifier;
        await context.Response.WriteAsJsonAsync(problem, cancellationToken);
        return true;
    }
}
