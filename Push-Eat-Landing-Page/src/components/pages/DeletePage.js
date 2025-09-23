import ContentService from "../ContentService";
import Delete from "../Delete";

function DeletePage() {
  return (
    <div>
      <ContentService
        title={
          <>
            Delete Your <br /> Pusheat Account
          </>
        }
        titleClass="smallTitle"
      >
        <Delete />
      </ContentService>
    </div>
  );
}

export default DeletePage;
