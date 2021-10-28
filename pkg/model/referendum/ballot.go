package referendum

import (
	"encoding/json"
	"fmt"

	"github.com/iotaledger/hive.go/serializer"
)

const (
	// BallotPayloadTypeID defines the ballot payload's type ID.
	BallotPayloadTypeID uint32 = 0

	MinQuestionsCount = 1
	MaxQuestionsCount = 10
)

var (
	questionsArrayRules = &serializer.ArrayRules{
		Min:            MinQuestionsCount,
		Max:            MaxQuestionsCount,
		ValidationMode: serializer.ArrayValidationModeNone,
	}
)

// Ballot
type Ballot struct {
	Questions serializer.Serializables
}

func (q *Ballot) Deserialize(data []byte, deSeriMode serializer.DeSerializationMode) (int, error) {
	return serializer.NewDeserializer(data).
		ReadSliceOfObjects(func(seri serializer.Serializables) { q.Questions = seri }, deSeriMode, serializer.SeriLengthPrefixTypeAsByte, serializer.TypeDenotationNone, func(_ uint32) (serializer.Serializable, error) {
			// there is no real selector, so we always return a fresh Question
			return &Question{}, nil
		}, questionsArrayRules, func(err error) error {
			return fmt.Errorf("unable to deserialize referendum questions: %w", err)
		}).
		Done()
}

func (q *Ballot) Serialize(deSeriMode serializer.DeSerializationMode) ([]byte, error) {

	//TODO: validate text lengths

	if deSeriMode.HasMode(serializer.DeSeriModePerformValidation) {
		//TODO: this should be moved as an arrayRule parameter to WriteSliceOfObjects in iota.go
		if err := questionsArrayRules.CheckBounds(uint(len(q.Questions))); err != nil {
			return nil, fmt.Errorf("unable to serialize referendum questions: %w", err)
		}
	}
	return serializer.NewSerializer().
		WriteSliceOfObjects(q.Questions, deSeriMode, serializer.SeriLengthPrefixTypeAsByte, nil, func(err error) error {
			return fmt.Errorf("unable to serialize referendum questions: %w", err)
		}).
		Serialize()
}

func (q *Ballot) MarshalJSON() ([]byte, error) {
	jQuestions := &jsonBallot{}

	jQuestions.Questions = make([]*json.RawMessage, len(q.Questions))
	for i, question := range q.Questions {
		jsonQuestion, err := question.MarshalJSON()
		if err != nil {
			return nil, err
		}
		rawJSONQuestion := json.RawMessage(jsonQuestion)
		jQuestions.Questions[i] = &rawJSONQuestion
	}

	return json.Marshal(jQuestions)
}

func (q *Ballot) UnmarshalJSON(bytes []byte) error {
	jQuestions := &jsonBallot{}
	if err := json.Unmarshal(bytes, jQuestions); err != nil {
		return err
	}
	seri, err := jQuestions.ToSerializable()
	if err != nil {
		return err
	}
	*q = *seri.(*Ballot)
	return nil
}

// jsonBallot defines the json representation of a Ballot.
type jsonBallot struct {
	Questions []*json.RawMessage `json:"questions"`
}

func (j *jsonBallot) ToSerializable() (serializer.Serializable, error) {
	payload := &Ballot{}

	questions := make(serializer.Serializables, len(j.Questions))
	for i, ele := range j.Questions {
		question := &Question{}

		rawJSON, err := ele.MarshalJSON()
		if err != nil {
			return nil, fmt.Errorf("pos %d: %w", i, err)
		}

		if err := json.Unmarshal(rawJSON, question); err != nil {
			return nil, fmt.Errorf("pos %d: %w", i, err)
		}

		questions[i] = question
	}
	payload.Questions = questions

	return payload, nil
}