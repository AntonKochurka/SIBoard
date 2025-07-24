from sqlalchemy import Column, Integer, DateTime, func
from sqlalchemy.orm import declared_attr
from sqlalchemy.inspection import inspect

class BaseMixin:
    id = Column(Integer, primary_key=True, index=True)

    @declared_attr
    def created_at(cls):
        return Column(DateTime(timezone=True), server_default=func.now())

    @declared_attr
    def updated_at(cls):
        return Column(DateTime(timezone=True), server_default=func.now(), onupdate=func.now())

    def from_attributes(self, include_relationships: bool = False) -> dict:
        """
        Convert SQLAlchemy model instance into dictionary.
            - include_relationships: include related objects if True (default False).
        """
        mapper = inspect(self.__class__)
        data = {}

        for column in mapper.columns:
            value = getattr(self, column.key)

            if isinstance(value, DateTime):
                data[column.key] = value.isoformat()
            else:
                data[column.key] = value

        if include_relationships:
            for name, relation in mapper.relationships.items():
                value = getattr(self, name)

                if value is not None:
                    if relation.uselist:
                        data[name] = [v.from_attributes(False) if hasattr(v, "from_attributes") else str(v) for v in value]
                    else:
                        data[name] = value.from_attributes(False) if hasattr(value, "from_attributes") else str(value)
        return data
