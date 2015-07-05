using System.Threading.Tasks;

namespace KlinkerSoft.Movies.Core.General
{
    public interface IInteractor<in TRequest, TResponse>
    {
        Task<TResponse> Interact(TRequest request);
    }
}
