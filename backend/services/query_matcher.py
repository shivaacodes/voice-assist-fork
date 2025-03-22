import re
from typing import List, Dict


def tokenize(text: str) -> List[str]:
    """Tokenize text into lowercase words, removing special characters."""
    # Remove special characters and convert to lowercase
    cleaned_text = re.sub(r"[^\w\s]", "", text.lower().strip())
    # Split into words and filter out short words (less than 2 characters)
    tokens = [word for word in cleaned_text.split() if len(word) > 1]
    return tokens


def match_query(user_query: str, stored_queries: List[Dict[str, str]]) -> str | None:
    """
    Match user query against stored queries based on token overlap.
    Returns the answer of the best matching query or None if no match.
    """
    user_tokens = set(tokenize(user_query))
    if not user_tokens:
        return None

    best_match = None
    max_overlap = 0

    for stored_query in stored_queries:
        stored_tokens = set(tokenize(stored_query["query"]))
        overlap = len(user_tokens.intersection(stored_tokens))

        # Consider it a match if overlap is significant (e.g., at least 50% of user tokens match)
        if overlap > max_overlap and overlap >= len(user_tokens) * 0.5:
            max_overlap = overlap
            best_match = stored_query["answer"]

    return best_match
