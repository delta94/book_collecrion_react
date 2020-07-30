import React, { FC, useState } from "react";

import "./books.css";
import { BooksPropsType } from "../container/books_container";

const Books: FC<BooksPropsType> = ({
  serchedBooks,
  message,
  getBooks,
  registerBooks,
}) => {
  const [keyword, changeKeyword] = useState("");
  const [memos, changeMemo] = useState(() => {
    if (serchedBooks) {
      let o: { [memo: string]: string } = {};
      for (let i = 0; i < serchedBooks.length; i++) {
        o["memo" + i] = "";
      }
      return o;
    }
    return null;
  });

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div className="books-container">
            <div className="serch-field">
              <div className="serch-set">
                <form>
                  <input
                    className="serch-form"
                    type="text"
                    value={keyword}
                    placeholder="キーワードを入力"
                    onChange={(e) => {
                      changeKeyword(e.target.value);
                    }}
                  />
                  <input
                    className="serch-button"
                    type="button"
                    value="検索"
                    onClick={() => getBooks(keyword)}
                  />
                </form>
              </div>
            </div>
            <div className="books">
              {serchedBooks
                ? serchedBooks.map((book, index) => {
                    return (
                      <div className="book" key={index.toString()}>
                        <div className="introduce">
                          <div className="title">{book.title}</div>
                          {book.authors ? (
                            <div className="authors">
                              {book.authors.toString()}
                            </div>
                          ) : (
                            <div className="authors">作者不明</div>
                          )}
                          <div className="registerBooks">
                            <div className="register-form">
                              <textarea
                                value={
                                  memos ? memos["memo" + index] : undefined
                                }
                                placeholder="メモやコメントを残す"
                                onChange={(e) => {
                                  changeMemo({
                                    ...memos,
                                    ["memo" + index]: e.target.value,
                                  });
                                }}
                              ></textarea>
                            </div>
                            <div className="register-form">
                              <button
                                type="button"
                                onClick={() => {
                                  registerBooks(
                                    book.title,
                                    book.authors,
                                    book.image,
                                    memos!["memo" + index]
                                  );
                                }}
                              >
                                MyBookに登録
                              </button>
                            </div>
                          </div>
                        </div>
                        {book.image ? (
                          <img src={book.image} alt=""></img>
                        ) : null}
                      </div>
                    );
                  })
                : null}
            </div>
            <div>{message && message.error ? message.error : null}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Books;
