namespace KlinkerSoft.Movies.Universal.Search.Messages
{
    public class SearchMessage
    {
        public string Title { get; }

        public SearchMessage(string title)
        {
            Title = title;
        }
    }
}
